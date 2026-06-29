import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RecordList, type AdminRow } from "@/components/admin/ui";
import { RecordFormDialog, type AdminField } from "@/components/admin/RecordFormDialog";

type ServerAction = (formData: FormData) => Promise<void>;

/**
 * The shared scaffold for every admin CRUD section: a header, a "create" dialog,
 * and a list of records each with an inline "edit" dialog plus delete.
 *
 * What varies per section (table, validation, the CRUD actions, the field
 * config, how a row renders) is passed in. The create/update/delete actions are
 * declared as `"use server"` closures IN THE PAGE MODULE and handed in here —
 * they cannot be created inside this component because Server Actions must be
 * defined at module scope, which is also why each page keeps its own thin
 * wrappers. This component owns only the markup that was identical across pages.
 *
 * `rows` is the already-mapped display shape; `editFor(row)` returns the record
 * object to prefill the edit dialog (usually the raw DB row).
 */
export function AdminCrudPage<T extends { id: number | string }>({
  title,
  description,
  createTitle,
  editTitle,
  triggerLabel,
  fields,
  rows,
  toRow,
  createAction,
  updateAction,
  deleteAction,
  empty,
}: {
  title: string;
  description?: string;
  createTitle: string;
  editTitle: string;
  triggerLabel?: string;
  fields: AdminField[];
  rows: T[];
  /** Map a raw row to its list display (primary/meta/badges). */
  toRow: (row: T) => Omit<AdminRow, "id" | "actions">;
  createAction: ServerAction;
  updateAction: ServerAction;
  deleteAction: ServerAction;
  empty: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <AdminPageHeader title={title} description={description} />
        <RecordFormDialog
          mode="create"
          title={createTitle}
          triggerLabel={triggerLabel}
          fields={fields}
          formAction={createAction}
        />
      </div>

      <RecordList
        rows={rows.map((row) => ({
          id: row.id,
          ...toRow(row),
          actions: (
            <RecordFormDialog
              mode="edit"
              title={editTitle}
              fields={fields}
              formAction={updateAction}
              record={row}
            />
          ),
        }))}
        deleteAction={deleteAction}
        empty={empty}
      />
    </div>
  );
}

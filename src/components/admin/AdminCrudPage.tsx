import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RecordList, type AdminRow } from "@/components/admin/ui";
import { RecordFormDialog, type AdminField } from "@/components/admin/RecordFormDialog";

type ServerAction = (formData: FormData) => Promise<void>;

/**
 * Shared scaffold for every admin CRUD section. The CRUD actions are passed in as
 * `"use server"` closures declared in the PAGE module: Server Actions must be defined at
 * module scope, so they cannot be created inside this component - hence each page's wrappers.
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

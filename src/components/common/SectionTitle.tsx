const SectionTitle = ({ children }: Readonly<{ children: string }>) => {
  return (
    <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold">
      {children}
    </p>
  );
};

export default SectionTitle;

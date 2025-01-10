import AlertContainer from "@components/alert/AlertContainer";
import TableComponent from "@components/Table";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <TableComponent />
      <AlertContainer />
    </section>
  );
}

import Filter from "../components/Filter";
import Outfits from "../components/Outfits";

export default function Saved() {
  return (
    <section>
      <div className="flex flex-col gap-3 mb-7">
        <h1>Saved Outfits</h1>
        <h2>Your collection of interview-ready outfits</h2>
      </div>
      <div>
        <Filter />
      </div>
      <div>

        <Outfits />
      </div>
    </section>
  );
}

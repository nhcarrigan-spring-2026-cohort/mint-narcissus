export default function Logo() {
  return (
    <div className="flex justify-start gap-4 items-center p-4">
      <img className="shrink-0"src="./src/assets/react.svg" height={50} width={50}/>
      <span className="hidden sm:flex md:text-lg text-2xl shrink-0">Interview Outfits</span>
    </div>
  );
}

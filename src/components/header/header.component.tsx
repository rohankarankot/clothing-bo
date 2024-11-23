import { ModeToggle } from "../mode-toggle";

const HeaderComponent = () => {
  return (
    <header className="text-gray-400  bg-primary-foreground body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center  mb-4 md:mb-0">
          <span className="ml-3 text-xl">Clothing.co</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a> */}
        </nav>

        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderComponent;

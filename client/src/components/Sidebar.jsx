import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

const Sidebar = ({
  token,
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Questions", href: "#" },
    { name: "Bounties", href: "#" },
    { name: "Tags", href: "#" },
    { name: "Leaderboard", href: "#" },
    { name: "My Profile", href: "#" },
  ];

  return (
    <>
      {/* Mobile Sidebar Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={toggleSidebar}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-30 md:hidden" />
          <Dialog.Content className="md:hidden fixed inset-0 bg-gray-100 z-30 p-4 shadow-inner-top">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Menu
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Navigation menu for QuestPay Q&A platform
            </Dialog.Description>
            <div className="flex justify-end mb-4">
              <Dialog.Close asChild>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  aria-label="Close menu"
                >
                  <Cross1Icon className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onPointerDown={() => handleNavClick(link.name.toLowerCase())}
                  className={`text-gray-700 hover:text-blue-600 hover:bg-gray-200 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeSection === link.name.toLowerCase()
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onPointerDown={() => handleNavClick("ask")}
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-md mt-4"
              >
                Ask Question
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Sidebar (Desktop: Fixed) */}
      <div className="hidden md:block fixed top-[4.25rem] left-0 h-[calc(100vh-4.25rem)] w-64 bg-gray-100 shadow-md shadow-inner-top z-40">
        <div className="flex flex-col space-y-2 p-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onPointerDown={() => handleNavClick(link.name.toLowerCase())}
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-200 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                activeSection === link.name.toLowerCase()
                  ? "bg-blue-100 text-blue-600"
                  : ""
              }`}
            >
              {link.name}
            </button>
          ))}

          {token ? (
            <button
              onPointerDown={() => handleNavClick("ask")}
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-md mt-4"
            >
              Ask Question
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

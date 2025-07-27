import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Questions', href: '/questions' },
    { name: 'Tags', href: '/tags' },
    { name: 'Users', href: '/users' },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 md:hidden" />
            <Dialog.Content className="md:hidden fixed inset-0 bg-white z-50 p-4">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold text-gray-900">
                  Menu
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  >
                    <Cross1Icon className="h-6 w-6" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-md transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Sidebar (Desktop: Fixed) */}
      <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md z-40">
        <div className="flex flex-col space-y-2 p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-md transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalBody, ModalHeader } from '@heroui/react';
import OpportunitiesDropdown from './OpportunitiesDropdown';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/members', label: 'Members' },
    { href: '/projects', label: 'Projects' },
    { href: '/events', label: 'Events' },
    { href: '/contact', label: 'Contact' },
    { href: '/donate', label: 'Donate' }
  ];

  const opportunitiesInsertAfterHref = '/events';

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <div className="lg:hidden">
        <Button
          isIconOnly
          variant="light"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-modal"
          className="p-2"
          onPress={handleOpen}
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-current top-2 transform transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </div>
        </Button>
      </div>

      {/* Full-Page Modal Navigation */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="full"
        placement="center"
        classNames={{
          base: "mobile-nav-modal",
          wrapper: "mobile-nav-wrapper",
          backdrop: "bg-black/80 backdrop-blur-sm"
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
        id="mobile-navigation-modal"
        aria-labelledby="mobile-nav-title"
        aria-modal="true"
        role="dialog"
      >
        <ModalContent className="bg-white dark:bg-gray-900 m-0 rounded-none">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-700">
              </ModalHeader>
              <ModalBody className="py-8">
                <nav
                  className="flex flex-col space-y-2"
                  role="navigation"
                  aria-label="Main navigation"
                >
                  {navigationLinks.map((link) => (
                    <React.Fragment key={link.href}>
                      <Button
                        variant="light"
                        className="justify-start h-14 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                        onPress={() => {
                          window.location.href = link.href;
                          onClose();
                        }}
                      >
                        {link.label}
                      </Button>
                      {link.href === opportunitiesInsertAfterHref && (
                        <OpportunitiesDropdown className="w-full" onCloseModal={onClose} />
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <style>{`
        @media (min-width: 721px) {
          .mobile-nav-modal,
          .mobile-nav-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavigation;

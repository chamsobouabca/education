"use client"

import { Level } from '@/app/types/types';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AddLevel() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [levelName , setlevelName] = React.useState<string>("");
    const [newModule , setNewModule] = React.useState<string>("");
    const [modules , setModules] = React.useState<string[]>([]);

    function handleAddNewModule() : void{
      if(newModule != ""){
        setModules([...modules , newModule]);
        setNewModule("");
      };
    };
    function handleRemoveModule(module : string) : void{
       setModules(modules.filter((mod) => mod != module));
    };

    async function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>){
      e.preventDefault();
      
    };
  return (
    <div className='flex flex-col w-11/12 mx-auto mb-12'>
        <Button className='self-end' variant='shadow' color='primary' endContent={<FaPlus />} onPress={onOpen}>Add a level</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-gray-950'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add a level</ModalHeader>
              <ModalBody>
              <form className="flex flex-col gap-4">
                <Input label="Level Name" type='text' variant='bordered' color='secondary' value={levelName} onChange={(e) => setlevelName(e.target.value)} />
                <section className='flex items-center gap-4'>
                <Input placeholder='add new module ...' type='text' variant='bordered' color='secondary' value={newModule} onChange={(e) => setNewModule(e.target.value)} />
                <Button variant='shadow' color='primary' isIconOnly onClick={handleAddNewModule}><FaPlus /></Button>
                </section>
              </form>
              <section className='flex flex-col gap-2'>
                {
                    modules.map((module) => (
                        <span key={module} className='flex flex-row items-center justify-between'>
                          <p className='text-gray-400 opacity-90 text-medium font-medium w-1/2 text-ellipsis overflow-hidden'>{module}</p>
                          <Button variant='shadow' color='danger' isIconOnly onClick={() => handleRemoveModule(module)}><MdDelete /></Button>
                        </span>
                    ))
                }
              </section>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

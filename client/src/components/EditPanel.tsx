import Overlay from '../Overlays/Overlay'
import { EditPanelProps } from '../Interfaces/ObjectInterfaces'
import { useState } from 'react'
import EditBoard from './EditBoard'
import DeleteConfirmation from './DeleteConfirmation'
import EditTask from './EditTask'

export default function EditPanel({
  target,
  id,
  close,
  currentBoard,
  position,
  task,
}: EditPanelProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  return (
    <>
      <Overlay open={editOpen}>
        {target === 'board' && (
          <EditBoard
            close={() => setEditOpen(false)}
            closeEditPanel={close}
            currentBoard={currentBoard}
          />
        )}
        {target === 'task' && <EditTask />}
      </Overlay>
      <Overlay open={deleteOpen}>
        {target === 'board' && (
          <DeleteConfirmation
            type='board'
            id={id}
            title={currentBoard?.title}
            close={() => setDeleteOpen(false)}
            closeEditPanel={close}
          />
        )}
        {target === 'task' && (
          <DeleteConfirmation
            type='task'
            id={id}
            title={task?.title}
            close={() => setDeleteOpen(false)}
            closeEditPanel={close}
          />
        )}
      </Overlay>
      <div
        className={`edit-panel absolute w-[192px] p-4 bg-white rounded-lg top-[85px] ${
          position ? position : 'right-[24px]'
        } z-40 shadow-md`}
      >
        <ul>
          <li className='mb-4 body-l text-med-gray'>
            <button
              disabled={!id}
              onClick={() => setEditOpen(!editOpen)}
            >{`Edit ${target[0].toUpperCase() + target.slice(1)}`}</button>
          </li>
          <li className='body-l text-red'>
            <button
              disabled={!id}
              onClick={() => setDeleteOpen(!deleteOpen)}
            >{`Delete ${target[0].toUpperCase() + target.slice(1)}`}</button>
          </li>
        </ul>
      </div>
    </>
  )
}

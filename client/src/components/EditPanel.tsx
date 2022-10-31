import Overlay from '../Overlays/Overlay'
import { EditPanelProps } from '../Interfaces/ObjectInterfaces'
import { useState } from 'react'
import EditBoard from './EditBoard'
import DeleteConfirmation from './DeleteConfirmation'

export default function EditPanel({
  target,
  id,
  close,
  currentBoard,
  position,
}: EditPanelProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  return (
    <>
      <Overlay open={editOpen}>
        <EditBoard
          close={() => setEditOpen(false)}
          closeEditPanel={close}
          currentBoard={currentBoard}
        />
      </Overlay>
      <Overlay open={deleteOpen}>
        <DeleteConfirmation
          type='board'
          id={id}
          title={currentBoard?.title}
          close={() => setDeleteOpen(false)}
          closeEditPanel={close}
        />
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

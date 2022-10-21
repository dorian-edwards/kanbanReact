import Overlay from '../Overlays/Overlay'
import { EditPanelProps } from '../Interfaces/ObjectInterfaces'
import { useState } from 'react'
import EditBoard from './EditBoard'

export default function EditPanel({
  target,
  id,
  close,
  currentBoard,
}: EditPanelProps) {
  const [fullScreenOpen, setFullScreenOpen] = useState<boolean>(false)
  return (
    <>
      <Overlay open={fullScreenOpen}>
        <EditBoard
          close={() => setFullScreenOpen(false)}
          currentBoard={currentBoard}
        />
      </Overlay>
      <div className='edit-panel absolute w-[192px] p-4 bg-white rounded-lg top-[85px] right-[24px] z-40 shadow-md'>
        <ul>
          <li className='mb-4 body-l text-med-gray'>
            <button
              disabled={!id}
              onClick={() => setFullScreenOpen(!fullScreenOpen)}
            >{`Edit ${target}`}</button>
          </li>
          <li className='body-l text-red'>
            <button
              disabled={!id}
              onClick={() => setFullScreenOpen(!fullScreenOpen)}
            >{`Delete ${target}`}</button>
          </li>
        </ul>
      </div>
    </>
  )
}

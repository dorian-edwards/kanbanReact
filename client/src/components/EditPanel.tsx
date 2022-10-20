import { EditPanelProps } from '../Interfaces/ObjectInterfaces'

export default function EditPanel({ target, id, close }: EditPanelProps) {
  return (
    <div className='edit-panel absolute w-[192px] p-4 bg-white rounded-lg top-[60px] left-[-192px]'>
      <ul>
        <li className='mb-4 body-l text-med-gray'>
          <button disabled={!id}>{`Edit ${target}`}</button>
        </li>
        <li className='body-l text-red'>
          <button disabled={!id}>{`Delete ${target}`}</button>
        </li>
      </ul>
    </div>
  )
}

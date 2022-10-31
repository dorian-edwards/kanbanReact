export interface User {
  id: string
  username: string
  email: string
}

export interface AuthContextInterface {
  login: (data: User) => void
  logout: () => void
  user: User | null
  boards: BoardInterface[] | []
  updateBoards: (data: BoardInterface | string) => void
}

export interface ButtonProps {
  styling: string
  text: string
  disabled: boolean
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

export interface BoardInterface {
  _id?: string
  title: string
  userId: string
  columns: ColumnInterface[] | []
}

export interface SubtaskInterface {
  _id: string
  content: string
  complete: boolean
  parentTask: string
  userId: string
}

export interface TaskInterface {
  _id: string
  title: string
  description: string
  status: string
  subtasks: SubtaskInterface[]
  userId: string
}

export interface ColumnInterface {
  _id: string
  title: string
  tasks: TaskInterface[]
  boardId: string
  userId: string
  currentBoard?: BoardInterface
}

export interface EditPanelProps {
  target: string
  id: string
  close: () => void
  currentBoard?: BoardInterface
  position?: string
}

export interface CheckInputProps {
  complete: boolean
  toggleComplete: () => void
}

export interface SubtaskProps {
  _id: string
  content: string
  complete: boolean
  setCompleted: (num: number) => void
}

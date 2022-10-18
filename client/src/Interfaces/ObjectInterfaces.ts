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
  updateBoards: (data: BoardInterface) => void
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
}

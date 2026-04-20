export type DockerPosition = {
  x: number
  y: number
}

export type DockerSize = {
  width: number
  height: number
}

export type Docker = {
  id: string
  title: string
  position: DockerPosition
  size: DockerSize
  isCollapsed: boolean
  isDraggable: boolean
  zIndex: number
}

export type DockerState = {
  dockers: Docker[]
  activeDockerId: string | null
}
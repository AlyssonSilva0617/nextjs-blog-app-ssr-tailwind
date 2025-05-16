import {Spin} from 'antd'

export default function Loading() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  )
}

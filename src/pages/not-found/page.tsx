import notFound from '@/assets/not-found.png'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col py-4 items-center justify-center">
      <img src={notFound} alt="Not found" className="w-[500px]" />
      <h1 className="text-xl text-gray-500 font-bold text-center">Page not found</h1>
    </div>
  )
}

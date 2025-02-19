import { toTitleCase } from '@/lib/utils'

export default function ForecastDetailNotFound({ name }: { name: string }) {
  return (
    <div className="flex justify-center my-16 text-gray-500">{toTitleCase(name)} not found</div>
  )
}

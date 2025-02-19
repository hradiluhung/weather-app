import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogInIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useAuth } from '@/context/auth-context'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
})

export default function LoginFormDialog({
  defaultOpen,
  setDefaultOpen,
}: {
  defaultOpen?: boolean
  setDefaultOpen?: (open: boolean) => void
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    setIsOpen(defaultOpen ?? false)
  }, [defaultOpen])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setDefaultOpen?.(open)
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    await login({ email: values.email, password: values.password })
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {defaultOpen === undefined && (
        <DialogTrigger asChild>
          <Button variant="ghost" className="hover:bg-inherit hover:text-blue-500">
            Login
          </Button>
        </DialogTrigger>
      )}
      <DialogContent hideClose className="w-full md:w-[360px] p-0">
        <div className="relative p-6">
          <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-blue-500/50 to-white h-1/2 w-full z-[-1]" />
          <div className="flex flex-col items-center gap-8 w-full">
            <DialogHeader>
              <div className="text-center flex items-center justify-center flex-col gap-4 ">
                <div className="shadow-lg p-4 rounded-xl bg-white">
                  <LogInIcon />
                </div>
                <DialogTitle className="font-bold text-2xl">Login</DialogTitle>
                <DialogDescription className="text-gray-500 text-sm">
                  Log in to save your favorite locations for quicker access to weather information.
                </DialogDescription>
              </div>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">Email</FormLabel>
                      <FormControl>
                        <FormInput {...field} placeholder="your.mail@mail.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">Password</FormLabel>
                      <FormControl>
                        <FormInput {...field} placeholder="Min 8 characters" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} className="flex items-center gap-2">
                  {loading && <Loader2 className="animate-spin size-5" />}
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

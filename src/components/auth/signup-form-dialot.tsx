import { useAuth } from '@/context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, NotebookPen } from 'lucide-react'
import { useState } from 'react'
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

export const signUpSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export default function SignUpFormDialog() {
  const { signUp } = useAuth()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setLoading(true)
    await signUp({ email: values.email, password: values.password })
    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent hideClose className="w-full md:w-[360px] p-0">
        <div className="relative p-6">
          <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-blue-500/50 to-white h-1/2 w-full z-[-1]" />
          <div className="flex flex-col items-center gap-8 w-full">
            <DialogHeader>
              <div className="text-center flex items-center justify-center flex-col gap-4 ">
                <div className="shadow-lg p-4 rounded-xl bg-white">
                  <NotebookPen />
                </div>
                <DialogTitle className="font-bold text-2xl">Sign Up</DialogTitle>
                <DialogDescription className="text-gray-500 text-sm">
                  Sign up to create an account and start using our services.
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">Confirm Password</FormLabel>
                      <FormControl>
                        <FormInput
                          {...field}
                          placeholder="Must be the same with password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} className="flex items-center gap-2">
                  {loading && <Loader2 className="animate-spin size-5" />}
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

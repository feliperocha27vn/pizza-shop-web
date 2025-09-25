import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.email('Digite um e-mail válido'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate(data)

      toast.success('Enviamos um link de acesso para seu e-mail!', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Erro ao tentar acessar o painel. Tente novamente.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'ghost'}>
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="w-[320px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" {...register('email')} />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full cursor-pointer"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

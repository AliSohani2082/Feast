'use client'

import *  as z from 'zod'
import { cache, useState } from 'react'
import { Trash, Check, Minus, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { createPostValidation } from '@/lib/validation'

// import {
//   Heading,
//   Button,
//   Separator,
//   Form,
//   Input,
//   ImageUpload,
// } from '@/components/ui'
import { cn } from '@/lib/utils'
import ImageUpload from '@/components/ui/imageUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel } from '@/components/ui/form'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { IPost } from '@/types'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandList, CommandGroup, CommandEmpty, CommandItem } from '@/components/ui/command'
import { getIngredients } from '@/lib/api'

type PostFormValues = z.infer<typeof createPostValidation>

interface PostFormProps {
  initialData?: IPost
}

const BillboardForm: React.FC<PostFormProps> = ({ initialData }) => {
  const router = useRouter()
  const [openDelete, setOpenDelete] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{id: string, amount: number}>>([])
  
  const ingredients = cache(async () => {
    const ingredientsItem: any = await getIngredients()
    return ingredientsItem.data
  })

  const testIngredients: Array<{id: string, name: string, type: string}> = [
    {
      name: "milk",
      type: "dairy",
      id: "1",
    },
    {
      name: "flover",
      type: "carbohydrates",
      id: "2",
    },
    {
      name: "beaf",
      type: "meat",
      id: "3",
    },
  ]

  console.log("hhhhh")
  console.log(ingredients())

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created'
  const action = initialData ? 'Save changes' : 'Create'


  const form = useForm<PostFormValues>({
    resolver: zodResolver(createPostValidation),
    defaultValues: initialData || {
      name: "",
      description: "",
      imageUrl: "",
      steps: [],
      ingredients: []
    },
  })

  const onSubmit = async (data: PostFormValues) => {
    // try {
    //   setLoading(true)
    //   if (initialData) {
    //     await axios.patch(
    //       `/api/${params.storeId}/billboards/${params.billboardId}`,
    //       data,
    //     )
    //   } else {
    //     await axios.post(`/api/${params.storeId}/billboards`, data)
    //   }
    //   router.refresh()
    //   router.push(`/${params.storeId}/billboards`)
    //   toast.success(toastMessage)
    // } catch (error) {
    //   toast.error('Something went wrong.')
    // } finally {
    //   setLoading(false)
    // }
  }

  const onDelete = async () => {
    // try {
    //   setLoading(true)
    //   await axios.delete(
    //     `/api/${params.storeId}/billboards/${params.billboardId}`,
    //   )
    //   router.refresh()
    //   router.push(`/${params.storeId}/billboards`)
    //   toast.success('Billboard deleted.')
    // } catch (error) {
    //   toast.error(
    //     'Make sure you removed all categories using this billboard first.',
    //   )
    // } finally {
    //   setLoading(false)
    //   setOpen(false)
    // }
  }

  return (
    <Card className='w-3/4'>
      {/* <AlertModal
        isOpen={openDelete}
  setOpenDelete      onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <CardHeader className="flex flex-col items-start">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpenDelete(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full flex flex-col justify-start items-start"
          >
            <div className='flex flex-col justify-stretch items-stretch'>
              <div className='flex flex-row justify-stretch items-stretch gap-4'>
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type="text" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Textarea disabled={loading} placeholder='describe the dish' {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients</FormLabel>
                        <FormControl>
                          <div className='flex flex-col justify-stretch items-stretch'>
                            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                              <PopoverTrigger>
                                <Button>Add Ingredient</Button>
                              </PopoverTrigger>
                              <PopoverContent side='right'>
                                <Command>
                                  <CommandInput placeholder='search through ingredients' />
                                  <CommandList>
                                    <CommandGroup>
                                      {testIngredients.map(({id, name, type}) => (
                                        <CommandItem key={id}>
                                          <Button
                                            variant="default"
                                            className='w-full flex flex-row justify-between items-center'
                                            onClick={() => {
                                              if(selectedIngredients.map(({id}) => id).includes(id)) {
                                                setSelectedIngredients(selectedIngredients.filter(({id}) => id!== id))
                                              } else {
                                                setSelectedIngredients([...selectedIngredients, {id, amount: 0}])
                                              }
                                              setOpenPopover(false)
                                            }}
                                          >
                                            <div className='flex flex-row justify-items-center items-center'>
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  selectedIngredients.map(({id}) => id).includes(id) ? "opacity-100" : "opacity-0"
                                                )}
                                              />
                                              <span>{name}</span>
                                            </div>
                                            <span>{type}</span>
                                          </Button>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            {selectedIngredients.map(({id, amount}) => {
                              const ing = testIngredients.find(({id}) => id === id)
                              return (
                                <div key={id} className='flex flex-row justify-between items-center'>
                                  <span>{ing?.name}</span>
                                  <div className='flex flex-row justify-between items-center'>
                                    <Button
                                      variant="default"
                                      className='w-16'
                                      onClick={() => setSelectedIngredients([...selectedIngredients, {id, amount: amount - 1}])}
                                    >
                                      <Minus className='h-4 w-4' />
                                    </Button>
                                    <Input type='number' value={amount} onChange={(e) => setSelectedIngredients([...selectedIngredients, {id, amount: parseInt(e.target.value)}])} />
                                    <Button
                                      variant="default"
                                      className='w-16'
                                      onClick={() => setSelectedIngredients([...selectedIngredients, {id, amount: amount + 1}])}
                                    >
                                      <Plus className='h-4 w-4' />
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default BillboardForm

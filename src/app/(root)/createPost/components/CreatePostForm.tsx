'use client'

import *  as z from 'zod'
import { cache, cloneElement, useEffect, useState } from 'react'
import { Trash, Check, Minus, Plus, PlusCircle, FileDiff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { toast } from 'sonner'
import { AlertModal } from '@/components/modals/alert-modal'
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
import { createPost, deletePost, getIngredients } from '@/lib/api'
import IngredientItem from './IngredientItem'

type PostFormValues = z.infer<typeof createPostValidation>

export const AmountTypeList = [
  "Kilogram" , "Gram", "Milligram", "Liter", "Teaspoon", "Tablespoon", "Cup", "Pint", "Quart", "Glass", "Ounce", "Pound", "Dozen", "Piece", "Drum", "Dish", "Box", "Bundle", "Bottle", "Can", "Jar", "Pack", "Packet", "Pouch", "Bag", "Bunch", "Bowl", "Plate", "Plateful", "Canister", "Jarful",  "Canful", "Crate", "Crateful", "Barrel", "Barrelful", "Bunch", "Bunchful", "Bowl", "Bowlful", "Plate", "Plateful", "Canister", "Jarful", "Canful", "Crate", "Crateful", "Barrel", "Barrelful", "Bunch", "Bunchful", "Bowl", "Bowlful", "Plate", "Plateful"

]

export type AmountType = typeof AmountTypeList[number] | null

interface PostFormProps {
  ingredientsData?: any
  initialData?: IPost,
  postId?: number,
}

export const CreatePostForm: React.FC<PostFormProps> = ({ initialData, ingredientsData, postId }) => {
  const router = useRouter()
  const [ingredients, setIngredients] = useState<any[]>([])
  const [openPopover, setOpenPopover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{id: string, amount: number, amountType: AmountType}>>([])
  const [steps, setSteps] = useState<string[]>(initialData ? initialData.steps : [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIngredients()
      console.log("ing")
      console.log(JSON.parse(data.data))
    }
    fetchData()
  }, [])

  const testIngredients: Array<{id: string, name: string, type: string}> = [
    {
      name: "milk",
      type: "dairy",
      id: "4",
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

  const title = initialData ? 'Edit post' : 'Create post'
  const description = initialData ? 'Edit a post' : 'Add a new post'
  const toastMessage = initialData ? 'Post updated.' : 'Post created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<PostFormValues>({
    resolver: zodResolver(createPostValidation),
    defaultValues: initialData || {
      name: "",
      description: "",
      imageUrl: "",
      steps: ["dd"],
      ingredients: []
    },
  })

  useEffect(() => {
    console.log(form)
  }, [form])


  const onSubmit = async (data: PostFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        
      } else {
        const result = await createPost(data)
        console.log("cereated Post", result)
      }
      router.refresh()
      // router.push(`/${params.storeId}/billboards`)
    } catch (error) {
      // toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await deletePost(postId || 0)
      router.refresh()
      router.push(`/post/${postId || 0}`)
      toast.success('Billboard deleted.')
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this billboard first.',
      )
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }
  const [openModal, setOpenModal] = useState(false)
  return (
    <Card className='w-full'>
      <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <CardHeader className="flex flex-col items-start">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpenModal(true)}
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
            <div className='flex flex-col justify-stretch w-full items-stretch'>
              <div className='flex flex-row justify-stretch w-full items-stretch gap-4'>
                <div className='w-1/2'>
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
                          <Textarea className='shad-input' disabled={loading} placeholder='describe the dish' {...field}/>
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
                <div className='w-1/2'>
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients</FormLabel>
                        <FormControl>
                          <div className='flex flex-col justify-stretch gap-2 items-stretch'>
                            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                              <PopoverTrigger>
                                <Button className='w-fll flex flex-row justify-between items-center gap-2'>
                                  <PlusCircle className='h-6 w-6' />
                                  Add Ingredient
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent side='right'>
                                <Command>
                                  <CommandInput placeholder='search through ingredients' />
                                  <CommandList>
                                    <CommandGroup>
                                      {testIngredients.map(({id, name, type}) => (
                                        <CommandItem key={id}
                                          className='w-full flex flex-row justify-between items-center'
                                          onSelect={() => {
                                            if(selectedIngredients.map(({id}) => id).includes(id)) {
                                              field.onChange(field.value.filter((ing) => ing.ingredientId !== id))
                                              setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== id))
                                            } else {
                                              field.onChange([...field.value, {ingredientId: id, amountType: null, amount: 0}])
                                              setSelectedIngredients([...selectedIngredients, {id: id, amountType: null, amount: 0}])
                                            }
                                            field.onChange()
                                            setOpenPopover(false)
                                          }}
                                        >
                                          <div className='flex flex-row justify-items-center items-center'>
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedIngredients.map((ing) => ing.id).includes(id) ? "opacity-100" : "opacity-0"
                                              )}
                                            />
                                            <span>{name}</span>
                                          </div>
                                          <span>{type}</span> 
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            {selectedIngredients.map(({id, amount}) => (
                              <IngredientItem
                                key={id}
                                id={id}
                                amount={amount}
                                selectedIngredients={selectedIngredients}
                                setSelectedIngredients={setSelectedIngredients}
                                testIngredients={testIngredients}
                                deleteIngredient={() => {
                                  field.onChange(field.value.filter((ing) => ing.ingredientId !== id))
                                  setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== id))
                                }}
                                setAmountType={(amountType: AmountType) => {
                                  const updatedIngredientsField = field.value.map((ingredient) => {
                                    if (ingredient.ingredientId === id) {
                                      return { ...ingredient, amountType: amountType };
                                    }
                                    return ingredient;
                                  });
                                  const updatedIngredients = selectedIngredients.map((ingredient) => {
                                    if (ingredient.id === id) {
                                      return { ...ingredient, amountType: amountType };
                                    }
                                    return ingredient;
                                  });
                                  setSelectedIngredients(updatedIngredients)
                                  field.onChange(updatedIngredients);
                                }}
                                updateAmountField={(newAmount: number) => {
                                  const updatedField = field.value.map((ing) => {
                                    if( ing.ingredientId === id ) {
                                      return { ...ing, amount: newAmount }
                                    }
                                    return ing;
                                  })
                                  field.onChange(updatedField)
                                }}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='mt-8'>
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Steps</FormLabel>
                      <FormControl>
                        <div {...field} className='flex flex-col justify-center items-start gap-2'>
                          {steps.map((step, index) => (
                            <div key={index} className='flex w-full justify-stretch items-start gap-2'>
                              <span className='w-20'>{`Step ${index}:`}</span>
                              <Textarea
                                value={step}
                                disabled={field.disabled}
                                onChange={(e) => {
                                  const newSteps = [...steps]
                                  newSteps[index] = e.target.value
                                  setSteps(newSteps)
                                  field.onChange(newSteps)
                                }}
                                placeholder={`Write the step number ${index}`}
                              />
                              <Button
                                onClick={() => {
                                  const newSteps = [...steps]
                                  newSteps.splice(index, 1)
                                  setSteps(newSteps)
                                  field.onChange(newSteps)
                                }}
                              >
                                <Trash className='h-6 w-6' />
                              </Button>
                            </div>
                          ))}
                          <Button
                            onClick={() => {
                              const newSteps = [...steps, ""]
                              setSteps(newSteps)
                              field.onChange(newSteps)
                            }}
                          >Add Step</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
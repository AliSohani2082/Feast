'use client'

import React, { useState } from 'react'
import { Minus, Plus, ChevronsUpDown, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AmountType, AmountTypeList } from './CreatePostForm'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type IngredientItemProps = {
  id: string,
  amount: number,
  selectedIngredients: Array<{id: string, amount: number, amountType: AmountType}>
  setSelectedIngredients: React.Dispatch<React.SetStateAction<Array<{id: string, amount: number, amountType: AmountType}>>>
  testIngredients: Array<{id: string, name: string, type: string}>
  setAmountType: (amountType: string) => void
  updateAmountField: (amount: number) => void
  deleteIngredient: () => void
}

const IngredientItem: React.FC<IngredientItemProps> = ({id, amount, selectedIngredients, setSelectedIngredients, testIngredients, setAmountType, updateAmountField, deleteIngredient}) => {
  const [open, setOpen] = useState(false)
  const [unit, setUnit] = useState<AmountType>(null)

  const updateAmount = (newAmount: number) => {
    const updatedIngredients = selectedIngredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, amount: newAmount };
      }
      return ingredient;
    });
    setSelectedIngredients(updatedIngredients);
  }
  const ing = testIngredients.find((ing) => ing.id === id)
  return (
    <div key={id} className='flex flex-row gap-3 p-4 border-2 rounded-md justify-between items-center'>
      <span>{ing?.name}</span>
      <div className='flex flex-row gap-3 justify-between items-center'>
        <Button
          variant="ghost"
          className=''
          onClick={() => {
            updateAmountField(amount - 1)
            updateAmount(amount - 1)
          }}
        >
          <Minus className='h-4 w-4' />
        </Button>
        <Input type='number' className={cn("shad-input", "w-20 h-10")} value={amount} onChange={(e) => updateAmount(parseInt(e.target.value))} />
        <Button
          variant="ghost"
          className=''
          onClick={() => {
            updateAmountField(amount + 1)
            updateAmount(amount + 1)
          }}
        >
          <Plus className='h-4 w-4' />
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button variant='outline' className='flex flox-row justify-center items-center gap-2'>
              {unit ? unit : "Select a unit"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput/>
              <CommandList>
                <CommandGroup>
                  {AmountTypeList.map((atl, index) => (
                    <CommandItem key={index}>
                      <Button variant="ghost" className='w-full' onClick={() => {
                        setUnit(atl)
                        setOpen(false)
                      }}>
                        {atl}
                      </Button>  
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button
        onClick={() => {
          deleteIngredient()
          setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient.id!== id))}
        }
      >
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default IngredientItem
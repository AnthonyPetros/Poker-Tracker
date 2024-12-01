"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const stakes = [
  {
    value: "1/2",
    label: "1/2",
  },
  {
    value: "1/3",
    label: "1/3",
  },
  {
    value: "2/5",
    label: "2/5",
  },
  {
    value: "5/5",
    label: "5/5",
  },
  {
    value: "5/10",
    label: "5/10",
  },
]

interface props {
    onChange?: (stakes: String | undefined) => void;
  }
  
const StakesPicker: React.FC<props> = ({ onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? stakes.find((stake) => stake.value === value)?.label
            : "Select Stake..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Stakes" className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {stakes.map((stake) => (
                <CommandItem
                  key={stake.value}
                  value={stake.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onChange?.(currentValue)
                  }}
                >
                  {stake.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === stake.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StakesPicker;

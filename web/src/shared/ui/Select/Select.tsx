import { FC, memo, useState } from 'react'
import {
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
    useMantineTheme
} from '@mantine/core'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import { SelectOption } from 'src/types'

interface Props {
    className: string
    label?: string
    optionsData: SelectOption[]
    selectedValue: string
    disabled?: boolean
    onChange: (value: string) => void
    placeholder?: string
}

const Select: FC<Props> = ({
    className,
    label,
    optionsData,
    selectedValue,
    disabled = false,
    onChange,
    placeholder
}) => {
    const theme = useMantineTheme()
    const [isOpen, setIsOpen] = useState(false)
    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption()
            setIsOpen(false)
        },
        onDropdownOpen: () => {
            if (disabled) return
            combobox.updateSelectedOptionIndex('active')
            setIsOpen(true)
        }
    })

    const handleValueSelect = (selected: string) => {
        if (selected !== selectedValue) {
            onChange(selected)
        }
        combobox.closeDropdown()
    }

    return (
        <Combobox
            disabled={disabled}
            store={combobox}
            onOptionSubmit={handleValueSelect}
            withinPortal={false}
        >
            <Combobox.DropdownTarget>
                <PillsInput
                    disabled={disabled}
                    label={label}
                    pointer
                    onClick={() => combobox.toggleDropdown()}
                    className={className}
                    rightSectionPointerEvents="none"
                    rightSection={
                        isOpen ? (
                            <IconChevronUp color={theme.colors.purple[5]} />
                        ) : (
                            <IconChevronDown color={theme.colors.gray[5]} />
                        )
                    }
                >
                    <Pill.Group>
                        {selectedValue ? (
                            optionsData.find((option) => {
                                return option.id === selectedValue
                            })?.name
                        ) : (
                            <Input.Placeholder>{placeholder}</Input.Placeholder>
                        )}
                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {optionsData?.map((item) => (
                        <Combobox.Option
                            value={item?.id.toString()}
                            key={item.id}
                        >
                            <Group gap="sm">
                                <Group gap={7}>
                                    <span>{item.name}</span>
                                </Group>
                            </Group>
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}

const MemoCustomSelect = memo(Select)

export default MemoCustomSelect

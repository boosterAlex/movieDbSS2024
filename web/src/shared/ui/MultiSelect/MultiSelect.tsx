import { FC, memo, useMemo, useState } from 'react'
import {
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
    useMantineTheme
} from '@mantine/core'

import CustomPill from './CustomPill'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import { SelectOption } from 'src/types'

interface Props {
    className: string
    label: string
    options: SelectOption[]
    selectedValues: string[]
    disabled?: boolean
    placeholder: string

    onChange: (value: string) => void
    onRemove: (value: string) => void
}

const MultiSelect: FC<Props> = ({
    className,
    disabled = false,
    label,
    placeholder,
    options: optionsData,
    selectedValues,
    onRemove,
    onChange
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
        if (selectedValues.length >= 3 || selectedValues.includes(selected)) {
            return
        }

        onChange(selected)
    }

    const pillsValue = useMemo(() => {
        const genresKeys = optionsData.reduce((acc, item) => {
            if (selectedValues.includes(item?.id?.toString())) {
                acc.push(item.name)
            }
            return acc
        }, [] as string[])
        return genresKeys
    }, [selectedValues, optionsData])

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
                        {pillsValue.length ? (
                            pillsValue.map((item: string, index: number) => (
                                <CustomPill
                                    isLastIndex={
                                        index === pillsValue.length - 1
                                    }
                                    key={item}
                                    value={item}
                                    onRemove={() =>
                                        onRemove?.(
                                            selectedValues[
                                                selectedValues.length - 1
                                            ]
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <Input.Placeholder>{placeholder}</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.preventDefault()
                                        onRemove?.(
                                            selectedValues[
                                                selectedValues.length - 1
                                            ]
                                        )
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {optionsData?.map((item) => (
                        <Combobox.Option value={String(item?.id)} key={item.id}>
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

const MemoCustomMultiSelect = memo(MultiSelect)

export default MemoCustomMultiSelect

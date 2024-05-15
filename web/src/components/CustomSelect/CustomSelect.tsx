import { FC, memo, useMemo, useState } from 'react'
import {
    Combobox,
    Group,
    Input,
    MantineStyleProp,
    Pill,
    PillsInput,
    useCombobox
} from '@mantine/core'

import CustomPill from './CustomPill'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import { colors } from 'src/style/colors'
import { SelectOption, TypeSetState } from 'src/types'

interface Props {
    disabled?: boolean
    style: MantineStyleProp
    label: string
    isMulti?: boolean
    optionsData: SelectOption[]
    selectedValues: string[]
    setSelectedValues: TypeSetState<string[]>
}

const CustomSelect: FC<Props> = ({
    disabled = false,
    isMulti = false,
    style,
    label,
    optionsData,
    selectedValues,
    setSelectedValues
}) => {
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

    const [isOpen, setIsOpen] = useState(false)

    const handleValueSelect = (selected: string) => {
        if (isMulti) {
            if (selectedValues.length >= 3 || selectedValues.includes(selected))
                return
            setSelectedValues((current: string[]) => [...current, selected])
        } else {
            if (selected !== selectedValues[0]) {
                setSelectedValues([selected])
            }
        }
    }

    const handleValueRemove = (selectedValues: string) =>
        setSelectedValues((current: string[]) =>
            current.filter((v) => v !== selectedValues)
        )

    const options = optionsData?.map((item) => {
        return (
            <Combobox.Option value={item?.id?.toString()} key={item.id}>
                <Group gap="sm">
                    <Group gap={7}>
                        <span>{item.name}</span>
                    </Group>
                </Group>
            </Combobox.Option>
        )
    })
    const renderIcon = () => {
        return isOpen ? (
            <IconChevronUp color={colors.blue[1]} />
        ) : (
            <IconChevronDown color={colors.gray[4]} />
        )
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
                    style={style}
                    rightSectionPointerEvents="none"
                    rightSection={renderIcon()}
                >
                    <Pill.Group>
                        {pillsValue.length > 0 ? (
                            pillsValue.map((item: string, index: number) => (
                                <CustomPill
                                    isLastIndex={
                                        index === pillsValue.length - 1
                                    }
                                    key={index}
                                    value={item}
                                    onRemove={() =>
                                        handleValueRemove(
                                            selectedValues[
                                                selectedValues.length - 1
                                            ]
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <Input.Placeholder>Select genre</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.preventDefault()
                                        handleValueRemove(
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
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}

const MemoCustomSelect = memo(CustomSelect)

export default MemoCustomSelect

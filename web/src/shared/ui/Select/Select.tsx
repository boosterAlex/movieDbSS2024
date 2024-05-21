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
    label: string
    optionsData: SelectOption[]
    selectedValues: string
    disabled?: boolean
    onChange: (value: string) => void
    placeholder: string
}

const Select: FC<Props> = ({
    label,
    optionsData,
    selectedValues,
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
        if (selected !== selectedValues) {
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
                    style={{ width: '283.67px' }}
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
                        {selectedValues ? (
                            selectedValues
                        ) : (
                            <Input.Placeholder>{placeholder}</Input.Placeholder>
                        )}
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {optionsData?.map((item) => (
                        <Combobox.Option
                            value={item?.id?.toString()}
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

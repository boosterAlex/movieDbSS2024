import { Button, Modal, Rating } from '@mantine/core'
import { useState } from 'react'

interface Props {
    opened: boolean
    open: () => void
    close: () => void
    onSave: (selectedRating: number) => void
    onRemove: () => void
    personalRating: number
}

function RatedModal({
    opened,
    close,
    onSave,
    onRemove,
    personalRating
}: Props) {
    const [value, setValue] = useState<number>(personalRating)

    const handleSave = () => {
        try {
            onSave(value)
            close()
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = () => {
        try {
            onRemove()
            close()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal.Root opened={opened} onClose={close}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Your rating</Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        <Rating value={value} onChange={setValue} count={10} />
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleRemove}>Remove rating</Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </>
    )
}

export default RatedModal

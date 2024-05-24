import { Flex, Button, Modal, Rating, Text, Divider } from '@mantine/core'
import { useState } from 'react'

import styles from './RatedModal.module.scss'

interface Props {
    opened: boolean
    open: () => void
    close: () => void
    onSave: (selectedRating: number) => void
    onRemove: () => void
    personalRating: number
    removeButtonDisabled: boolean
    movieTitle: string
}

function RatedModal({
    removeButtonDisabled,
    opened,
    close,
    onSave,
    onRemove,
    personalRating,
    movieTitle
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
        <Modal.Root opened={opened} onClose={close} centered>
            <Modal.Overlay />
            <Modal.Content className={styles.modalContainer}>
                <Modal.Header className={styles.header}>
                    <Modal.Title>Your rating</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Divider />
                <Modal.Body>
                    <Flex className={styles.bodyContainer}>
                        <Text fw={700} className={styles.title}>
                            {movieTitle}
                        </Text>

                        <Rating
                            className={styles.rating}
                            size="xl"
                            value={value}
                            onChange={setValue}
                            count={10}
                        />

                        <Flex className={styles.buttonsContainer}>
                            <Button
                                className={styles.saveButton}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                className={styles.removeButton}
                                variant="outline"
                                onClick={handleRemove}
                                disabled={removeButtonDisabled}
                            >
                                Remove rating
                            </Button>
                        </Flex>
                    </Flex>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
}

export default RatedModal

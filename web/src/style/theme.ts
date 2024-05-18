import { createTheme } from '@mantine/core'

const theme = createTheme({
    white: '#FFFFFF',

    black: '#232134',

    colors: {
        gray: [
            '#F1F1F1',
            '#F5F5F6',
            '#EAEBED',
            '#D5D6DC',
            '#C8CAD3',
            '#ACADB9',
            '#7B7C88',
            '#767c91',
            '#656a7e',
            '#585e72'
        ],

        purple: [
            '#f3edff',
            '#F2ECFA',
            '#E5D5FA',
            '#D1B4F8',
            '#BD93F7',
            '#9854F6',
            '#9854F6',
            '#541F9D',
            '#9854F6',
            '#9854F6'
        ]
    },

    primaryColor: 'purple',

    fontSizes: {
        xs: '0.875rem',
        sm: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem'
    },

    spacing: {
        xs: '0.25rem',
        sm: '0.375rem',
        md: '0.5rem',
        xmd: '0.625rem',
        lg: '0.75rem',
        xlg: '1rem',
        xl: '1.25rem',
        xxl: '1.5rem'
    },

    radius: {
        lg: '0.75rem',
        xl: '1rem'
    }
})

export default theme

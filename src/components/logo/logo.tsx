import React, {FC} from 'react'
import {Box, Typography} from '@mui/material'

interface Props {
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

const Logo: FC<Props> = ({onClick, variant}) => {
    return (
        <Box onClick={onClick} sx={{cursor: 'pointer'}}>
            <Typography
                variant="h4"
                component="h1"
                sx={{fontWeight: 700, '& span': {color: variant === 'primary' ? 'primary.main' : 'unset'}}}
            >
                Oxford<span>Medical</span>
            </Typography>
        </Box>
    )
}

Logo.defaultProps = {
    variant: 'primary',
}

export default Logo

import * as React from 'react'
import theme from '../../../theme/hooks/CreateTheme'

interface IProps {
    text: string
    color: string
    fontWeight?: string | number
    fontSize?: string | number
    fontFamily?: string
}

export default function Information({
    text,
    color = theme.palette.black.main,
    fontWeight = theme.typography.fontWeightFull.fontWeight,
    fontSize = theme.typography.S2.fontSize,
    fontFamily = theme.typography.fontFamily1.fontFamily,
}: IProps) {
    return (
        <div
            style={{
                color: color,
                fontWeight: fontWeight,
                fontSize: fontSize,
                fontFamily: fontFamily,
            }}
        >
            {text}
        </div>
    )
}

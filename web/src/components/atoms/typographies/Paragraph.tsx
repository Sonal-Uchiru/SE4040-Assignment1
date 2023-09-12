import * as React from 'react'
import theme from '../../../theme/hooks/CreateTheme'
import { useTranslation } from 'react-i18next'

interface IProps {
    text: string
    color: string
    fontWeight?: string | number
    fontSize?: string | number
    fontFamily?: string
}

export default function Paragraph({
    text,
    color = theme.palette.black.main,
    fontWeight = theme.typography.fontWeightNormal.fontWeight,
    fontSize = theme.typography.S1.fontSize,
    fontFamily = theme.typography.fontFamily1.fontFamily,
}: IProps) {
    const { t } = useTranslation()
    return (
        <div
            style={{
                color: color,
                fontWeight: fontWeight,
                fontSize: fontSize,
                fontFamily: fontFamily,
            }}
        >
            {t(text)}
        </div>
    )
}

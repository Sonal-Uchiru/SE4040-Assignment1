import * as React from 'react'
import MUIDataTable from 'mui-datatables'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'
import { getDataArrayByJson } from '../../../utils/datatable/TransformData'
import OfficerEditResearchCategoryModal from '../../modals/officer/OfficerEditResearchCategoryModal'
import { getFormattedDate } from '../../../utils/common/DateFormatter'
import ResearchDisseminationProtectedApi from '../../../api/exclusive/ResearchDisseminationProtectedApi'
import { AxiosError } from 'axios'
import ContentLoadingBar from '../../atoms/Loadings/ContentLoadingBar'
import ErrorModal from '../../modals/ErrorModal'
import SummarizedContentPreviewModal from '../../modals/officer/SummarizedContentPreviewModal'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import theme from '../../../theme/hooks/CreateTheme'

interface IProp {
    isDataUpdated: boolean
}

export default function ReservationManagementTrainListDataTable({}: IProp) {
    
    const data = [
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
        ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
       ];
      
    const options: any = {
        responsive: 'standard',
        rowsPerPageOptions: [5, 10, 15, 20],
        rowsPerPage: 10,

        onTableChange: (action: any, state: any) => {
            console.log(action)
            console.log(state)
        },
    }

    const [isOpen, setIsOpen] = React.useState(false)
    const [isPreview, setIsPreview] = React.useState(false)

    function handleClick() {
        console.log('clicked')
    }


    const columns = [
        ('Train Name'),
        ('Departure Time'),
        ('Arrival Time'),
        ('Available Seats'),
        ('Price (LKR.)'),
        {
            name:('Action'),
            options: {
                customBodyRender: (
                    value: any,
                    tableMeta: any,
                    updateValue: any
                ) => {
            
                    return (
                        <div style={{justifyContent:'center'}}>
                            
                            <div>
                                <ContainedButton title={'Book'} backgroundColor={theme.palette.primary.main} width={90}/>
                            </div>
                        </div>
                    )
                },
            },
        },
    ]

    return (
        <>
                <Box sx={styles.table}>
                        <MUIDataTable
                            title={'Train List'}
                            data={data}
                            columns={columns}
                            options={options}
                        />
    
                </Box>
            
        </>
    )
}

const styles = {
    table: {
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '20px',
        marginBottom: '10px',
    },
}

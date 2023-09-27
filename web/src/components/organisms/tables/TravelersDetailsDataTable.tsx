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

interface IProp {
    isDataUpdated: boolean
}

export default function TravelersDetailsDataTable({}: IProp) {
    
    const data = [
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
        ["992652365V", "Kaveen", "Sithija", "kaveensithija34@gmail.com", "0771234567"],
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
        ('NIC'),
        ('First Name'),
        ('Last Name'),
        ('Email'),
        ('Mobile Number'),
        {
            name:('Action'),
            options: {
                customBodyRender: (
                    value: any,
                    tableMeta: any,
                    updateValue: any
                ) => {
            
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
                            <div>
                                <IconButton
                                    onClick={() => {
                                        handleClick()
                                    }}
                                >
                                    <img
                                        alt="Edit Icon"
                                        src="./images/editing.png"
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </IconButton>
                            
                            </div>
                            <div>
                                <IconButton
                                    onClick={() => {
                                        handleClick()
                                    }}
                                >
                                    <img
                                        alt="Edit Icon"
                                        src="./images/trash.png"
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </IconButton>
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
                            title={'Travelers List'}
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

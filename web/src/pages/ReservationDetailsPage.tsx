import * as React from 'react'
import Box from '@mui/material/Box'
import Title from '../components/atoms/title/Title'
import ResearchFindingsListDataTable from '../components/organisms/tables/ResearchFindingsListDataTable'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import theme from '../theme/hooks/CreateTheme'
import OfficerAddNewResearchPaperModal from '../components/modals/officer/OfficerAddNewResearchPaperModal'
import ResearchDisseminationProtectedApi from '../api/exclusive/ResearchDisseminationProtectedApi'
import { uploadResearchPaperAsync } from '../utils/firebase/UploadFile'
import Snackbar from '@mui/material/Snackbar'
import { Alert, AlertColor } from '@mui/material'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import ResearchDisseminationService from '../api/services/ResearchDisseminationService'
import ErrorModal from '../components/modals/ErrorModal'
import SuccessModal from '../components/modals/SuccessModal'
import TravelersDetailsDataTable from '../components/organisms/tables/TravelersDetailsDataTable'
import ReservationDetailsDataTable from '../components/organisms/tables/ReservationDetailsDataTable'

export default function ReservationDetailsPage() {

function handleClick() {
        console.log('clicked')
    }

    return (
        <>
            <Box sx={{ minHeight: 650 }}>
                <div style={{marginTop:30}}>
                    <Title
                      
                        backicon={false}
                        titleName="Reservation Details"
                    />
                </div>

                <div>
                    <ReservationDetailsDataTable isDataUpdated={false}/>
                </div>
            </Box>
        </>
    )
}

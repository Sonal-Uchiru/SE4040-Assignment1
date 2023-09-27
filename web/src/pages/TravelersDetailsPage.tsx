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

export default function TravelersDetailsPage() {

function handleClick() {
        console.log('clicked')
    }

    return (
        <>
            <Box sx={{ minHeight: 650 }}>
                <div>
                    <Title
                        backicon={false}
                        titleName="Travelers Details"
                    />
                    <div style={styles.button}>
                        <ContainedButton
                            onClick={handleClick}
                            title={'Add New Traveler'}
                            backgroundColor={theme.palette.darkBlue.main}
                            height={60}
                            width={200}
                            
                        />
                    </div>
                </div>

                <div>
                    <TravelersDetailsDataTable isDataUpdated={false}/>
                </div>
            </Box>
        </>
    )
}

const styles = {
    button: {
        display: 'flex',
        justifyContent: 'end',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
}

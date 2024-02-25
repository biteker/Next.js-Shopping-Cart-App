import { Box, Pagination } from "@mui/material";

export default function AppPagination() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh" // Bu, bileşeni dikey olarak da ortalar
        >
            <Pagination count={10} size="large" />
        </Box>
    );
}
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <Grid item xs={5}>
        <Typography>
          Displaying {totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0} -{" "}
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount} items
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Pagination
          variant="outlined"
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => onPageChange(page)}
        />
      </Grid>
    </Box>
  );
}

import { Text, Button, Grid, Row } from "@nextui-org/react";

const AuthPopover = () => {
  return (
    <Grid.Container
      css={{
        borderRadius: "14px",
        padding: "0.75rem",
        maxWidth: "330px",
      }}
    >
      <Row justify="center" align="center" css={{ paddingBottom: "1rem" }}>
        <Text b>Welcome Back!</Text>
      </Row>

      <Grid.Container
        gap={1}
        direction="column"
        justify="space-between"
        alignContent="center"
      >
        <Grid>
          <Button size="md" color="gradient" ghost>
            Sign Up
          </Button>
        </Grid>
        <Grid>
          <Button size="md" color="gradient" ghost>
            Log in
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default AuthPopover;

import { UnlockIcon } from "@chakra-ui/icons";
import {  Heading, Button, useToast, AvatarBadge, Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const toast = useToast();
  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };
  const [token, setToken] = useState(getToken());
  useEffect(() => {
    setToken(getToken());
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast({
      title: 'Logged out.',
      description: "Successfully logged out",
      duration: 10000,
      isClosable: true,
      position: 'top',
      status: 'success',
      icon: <UnlockIcon />,
    });
    window.location.reload();
  };

  return (
    <>
      <Container>
        <Row className="justify-content-between aligin-items-center">
          <Col lg={9}>
            <div className="mt-3">
              <Heading as={Link} to="/" exact fontSize="1.5em">GAGAN'S BLOGS</Heading>
            </div>
          </Col>
          <Col className="text-end me-0">
            <Stack direction="horizontal" className="me-0">
              <Button textColor={"001219"} colorScheme="transparent" as={Link} to="/create">
                New Blog
              </Button>

              {token ? (
                <Button
                  colorScheme="red"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button as={Link} to="/login">
                  Login
                </Button>
              )}
              <div className="ms-5">
                <Avatar name="mario" as={Link} to="/profile" src="/img/mario.png">
                  <AvatarBadge boxSize="1.3em" bg="teal.500">
                    <Text fontSize="xs" color="white">3</Text>
                  </AvatarBadge>
                </Avatar>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

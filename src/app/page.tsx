"use client";
import {
  Box,
  Heading, 
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner
} from '@chakra-ui/react';
import { useEffect, useState, useMemo } from "react";
import { debounce } from 'lodash';

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/advocates")
      .then((res) => res.json())
      .then((data) => {
        setAdvocates(data.data);
        setFilteredAdvocates(data.data);
      setIsLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    const filtered = advocates.filter((a) =>
      [a.firstName, a.lastName, a.city, a.degree, ...a.specialties, a.yearsOfExperience]
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase())
    );

    setFilteredAdvocates(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
      setSearchTerm(term);  
      debouncedSearch(term);  
  };

  const onReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);

  return (
    <Box p={8}>
      <Heading mb={6}>Solace Advocates</Heading>
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="md" mb={4}>Search</Heading>
        <HStack>
          <Input
            placeholder="Search advocates..."
            value={searchTerm}
            onChange={onChange}
            width="300px"
          />
          <Button onClick={onReset}>Reset</Button>
        </HStack>
        <Text>
          Searching for: <b>{searchTerm}</b>
        </Text>
      </VStack>

      {isLoading ? (
          <HStack spacing={4}>
            <Spinner size="lg" color="teal.500" />
            <Text>Loading advocates...</Text>
          </HStack>
        ) : ( filteredAdvocates.length === 0 ? (
          <Text>No advocates found.</Text>
        ) : (
      <Box overflowX="auto">
        <Heading size="md" mb={4}>Results</Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>City</Th>
              <Th>Degree</Th>
              <Th>Specialties</Th>
              <Th>Years</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAdvocates.map((a, i) => (
              <Tr key={a.id} _hover={{ bg: "blue.100" }}>
                <Td>{a.firstName}</Td>
                <Td>{a.lastName}</Td>
                <Td>{a.city}</Td>
                <Td>{a.degree}</Td>
                <Td>{a.specialties.join(", ")}</Td>
                <Td>{a.yearsOfExperience}</Td>
                <Td>{a.phoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      ))}
    </Box>
  );
}
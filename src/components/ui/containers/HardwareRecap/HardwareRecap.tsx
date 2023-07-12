// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useFormContext } from 'react-hook-form';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { CreditSubformData } from '@components/forms/CreditSubform';
import useGetProviderPrices from '@hooks/useGetProviderPrices';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import formatBigNumber from '@utils/format/formatBigNumber';

export interface HardwareRecapProps {
  defaultDuration?: number;
  gpuQty?: number;
  cpuQty?: number;
  memQty?: number;
}

const HardwareRecap: FC<HardwareRecapProps> = ({ defaultDuration, gpuQty = 0, cpuQty = 0, memQty = 0 }) => {
  const [time, setTime] = useState({ hours: 0, minutes: defaultDuration });
  const [selectedTimeType, setSelectedTimeType] = useState<keyof typeof time>('minutes');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setTime((prevState) => {
      return { ...prevState, minutes: defaultDuration };
    });
  }, [defaultDuration]);

  const { data: provider } = useGetProviderPrices('0x75761b17c3088ce5cd8e02575c6daa438ffa6e12');

  const { setValue, formState } = useFormContext<CreditSubformData>();

  const credit = useMemo<bigint>(() => {
    if (!provider || !time[selectedTimeType]) return 0n;

    const value =
      (provider.gpuPricePerMin * BigInt(gpuQty) +
        provider.cpuPricePerMin * BigInt(cpuQty) +
        provider.memPricePerMin * BigInt(memQty)) *
      BigInt(selectedTimeType === 'hours' ? time[selectedTimeType]! * 60 : time[selectedTimeType]!);

    setValue('credit', value.toString());

    return value;
  }, [cpuQty, provider, gpuQty, memQty, selectedTimeType, setValue, time]);

  useEffect(() => {
    setOpen(!!formState.errors.credit);
  }, [formState.errors]);

  if (!provider) return null;

  const rows = [
    ...(gpuQty !== 0
      ? [
          {
            id: 'gpu',
            productName: 'GPU',
            qty: gpuQty,
            price: time[selectedTimeType]
              ? formatBigNumber(
                  provider.gpuPricePerMin *
                    BigInt(gpuQty) *
                    BigInt(selectedTimeType === 'hours' ? time[selectedTimeType]! * 60 : time[selectedTimeType]!),
                  { divide: 18, precision: 2 },
                )
              : '0',
          },
        ]
      : []),
    ...(cpuQty !== 0
      ? [
          {
            id: 'cpu',
            productName: 'CPU',
            qty: cpuQty,
            price: time[selectedTimeType]
              ? formatBigNumber(
                  provider.cpuPricePerMin *
                    BigInt(cpuQty) *
                    BigInt(selectedTimeType === 'hours' ? time[selectedTimeType]! * 60 : time[selectedTimeType]!),
                  { divide: 18, precision: 2 },
                )
              : '0',
          },
        ]
      : []),
    ...(memQty !== 0
      ? [
          {
            id: 'mem',
            productName: 'Memory (MB)',
            qty: memQty,
            price: time[selectedTimeType]
              ? formatBigNumber(
                  provider.memPricePerMin *
                    BigInt(memQty) *
                    BigInt(selectedTimeType === 'hours' ? time[selectedTimeType]! * 60 : time[selectedTimeType]!),
                  { divide: 18, precision: 2 },
                )
              : '0',
          },
        ]
      : []),
  ];

  return (
    <div>
      <h3 className="text-base font-semibold">Time Allocation</h3>
      <div className="my-4 overflow-x-auto rounded-lg border-solid border-[#e6e5ed] border-2">
        <div className="flex justify-between items-center">
          <div className="p-3">
            <h3 className="text-base font-semibold leading-6 text-[#5D5B70]">Time Allocation</h3>
          </div>
          <div className="p-3">
            <div className="flex pl-4 py-1 items-center space-x-4 border-solid border-2 border-[#e6e5ed] rounded-md">
              <input
                type="number"
                value={time[selectedTimeType]}
                onChange={(event) => {
                  if (!event.target.value) return;
                  setTime({ ...time, [selectedTimeType]: event.target.value });
                }}
                className="w-20 border-0 focus-visible:outline-0 appearance-none"
                placeholder="duration"
              />
              <Select
                variant="standard"
                value={selectedTimeType}
                disableUnderline
                onChange={(event) => {
                  setSelectedTimeType(event.target.value as 'hours' | 'minutes');
                }}
              >
                <MenuItem value="hours">hours</MenuItem>
                <MenuItem value="minutes">min</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <TableContainer>
          <Table className="border-2">
            <TableHead>
              <TableRow className="">
                <TableCell width="75%">Component</TableCell>
                <TableCell width="10%">Quantity</TableCell>
                {/*<TableCell width="0.5%"></TableCell>*/}
                <TableCell width="15%">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow className="border-2" key={row.productName}>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    {/*<TableCell></TableCell>*/}
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className="font-semibold text-gray-900 dark:text-white border-t-2 bg-[#EFEDFF]">
                <TableCell className="px-6 py-3 text-base font-bold text-[#06021C]">Total</TableCell>
                <TableCell className=" text-gray-400"></TableCell>
                <Tooltip
                  open={open}
                  disableFocusListener
                  disableTouchListener
                  disableHoverListener
                  arrow
                  placement="bottom-start"
                  title={formState.errors.credit?.message}
                >
                  <TableCell className="px-4 py-3 font-bold text-primary">
                    {formatBigNumber(credit, {
                      divide: 18,
                      precision: 2,
                    })}{' '}
                    CREDITS
                  </TableCell>
                </Tooltip>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div className="pl-6 text-sm">Unused credits will be sent back to you</div>
    </div>
  );
};

export default HardwareRecap;

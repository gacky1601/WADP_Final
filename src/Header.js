import React from 'react';
import { Avatar, Flex, Text, Button } from '@radix-ui/themes';

export const BrandHeader = ({ user, onLoginClick }) => {
  return (
    <Flex
      justify="between"
      align="center"
      style={{
        paddingInline: '5%', // 左右各保留 10% 的空間
        paddingBlock: '10px'   // 上下內距
      }}
    >
      <Text weight="bold">
        <Avatar
          size="1"
          src="https://mrt.yupooooo.me/logo512.png"
          radius="full"
          fallback="T"
        /> 小豬出行
      </Text>

      {!user ? (
        <Button onClick={onLoginClick}>登入</Button>
      ) : (
        <Flex align="center" gap="2">
          <Text>{user}</Text>
          <Button
            variant="soft"
            color="red"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}
          >
            登出
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

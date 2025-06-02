/* Header.js */
import React from 'react';
import { Avatar, Flex, Text, Button } from '@radix-ui/themes';

export const BrandHeader = ({ user, onLoginClick, onLogout }) => {
  return (
    <Flex
      justify="between"
      align="center"
      style={{
        paddingInline: '5%',
        paddingBlock: '10px'
      }}
    >
      <Text weight="bold">
        <Avatar
          size="1"
          src="https://wadp-final.vercel.app/logo512.png"
          radius="full"
          fallback="T"
        /> 捷運即時通
      </Text>

      {!user ? (
        <Button onClick={onLoginClick}>登入</Button>
      ) : (
        <Flex align="center" gap="2">
          <Text>{user}</Text>
          <Button
            variant="soft"
            color="red"
            onClick={onLogout} // ✅ 呼叫傳進來的登出方法
          >
            登出
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

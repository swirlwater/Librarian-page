<template>
    <Space>
        书名:
        <Input placeholder="Enter name" style="width: auto">
        <template #prefix>
            <Icon type="ios-book" />
        </template>
        </Input>
        作者:
        <Input placeholder="Enter text" style="width: auto">
        <template #prefix>
            <Icon type="ios-contact" />
        </template>
        <template #suffix>
            <Icon type="ios-search" @click="press" />
        </template>
        </Input>
    </Space>
</template>

<script>
export default {
    methods: {
        press() {
            alert('hello')
        }
    }
}
</script>

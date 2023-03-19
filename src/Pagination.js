import React, { useState } from 'react';

export function paginateArray(array, pageSize, pageNumber) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}

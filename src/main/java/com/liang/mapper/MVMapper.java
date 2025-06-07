package com.liang.mapper;

import com.liang.domain.MV;
import java.util.List;

public interface MVMapper {
    List<MV> selectAll();
    MV selectById(int id);
    void insert(MV mv);
    void update(MV mv);
    void deleteById(int id);
}

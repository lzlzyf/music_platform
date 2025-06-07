package com.liang.service;

import com.liang.domain.MV;
import java.util.List;

public interface MVService {
    List<MV> getAllMVs();
    MV getMVById(int id);
    void addMV(MV mv);
    void updateMV(MV mv);
    void deleteMV(int id);
}

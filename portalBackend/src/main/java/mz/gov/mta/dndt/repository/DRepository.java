package mz.gov.mta.dndt.repository;

import mz.gov.mta.dndt.domain.D;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the D entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DRepository extends JpaRepository<D, Long> {
}
